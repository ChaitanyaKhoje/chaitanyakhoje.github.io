# frozen_string_literal: true

require "date"
require "fileutils"
require "open3"
require "tmpdir"
require "minitest/autorun"

class NewPostTest < Minitest::Test
  ROOT = File.expand_path("..", __dir__)
  SCRIPT = File.join(ROOT, "bin", "new-post")

  def setup
    @tmpdir = Dir.mktmpdir("new-post-test")
    FileUtils.mkdir_p(File.join(@tmpdir, "_posts"))
  end

  def teardown
    FileUtils.remove_entry(@tmpdir)
  end

  def run_new_post(*args)
    Open3.capture3("ruby", SCRIPT, *args, chdir: @tmpdir)
  end

  def test_creates_post_with_expected_front_matter
    stdout, stderr, status = run_new_post(
      "My First Post!",
      "--date", "2026-05-03",
      "--description", "A short post summary.",
      "--tags", "ruby, jekyll, writing"
    )

    assert status.success?, stderr
    path = File.join(@tmpdir, "_posts", "2026-05-03-my-first-post.md")
    assert File.exist?(path), stdout

    content = File.read(path)
    assert_includes content, "layout: post"
    assert_includes content, 'title: "My First Post!"'
    assert_includes content, 'description: "A short post summary."'
    assert_includes content, "tags: [ruby, jekyll, writing]"
    assert_includes content, "date: 2026-05-03"
    assert_includes content, "## Notes"
  end

  def test_refuses_to_overwrite_existing_post
    existing = File.join(@tmpdir, "_posts", "2026-05-03-my-post.md")
    File.write(existing, "keep me")

    _stdout, stderr, status = run_new_post("My Post", "--date", "2026-05-03")

    refute status.success?
    assert_equal "keep me", File.read(existing)
    assert_includes stderr, "already exists"
  end
end
