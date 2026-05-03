require 'html-proofer'

task :test do
  sh "bundle exec jekyll build"
  HTMLProofer.check_directory("./_site", {
    assume_extension:    true,
    check_html:          true,
    disable_external:    true,
    allow_missing_href:  true,
    allow_hash_href:     true,
    ignore_urls:         [/fonts\.googleapis\.com/, /fonts\.gstatic\.com/],
    report_invalid_tags: false,
    report_script_embeds: false,
  }).run
end

task default: :test
