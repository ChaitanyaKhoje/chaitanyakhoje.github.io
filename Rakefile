require 'html-proofer'

task :test do
  sh "bundle exec jekyll build"
  options = { 
    :assume_extension => true,
    :check_html => true,
    :check_img_http => true,
    :check_opengraph => true,
    :check_favicon => true,
    :enforce_https => true,
    :report_invalid_tags => true,
    :report_missing_names => true,
    :report_script_embeds => true,
    :typhoeus => {
      :connecttimeout => 20,
      :timeout => 60
    },
    :hydra => { 
      :max_concurrency => 50 
    }
  }
  HTMLProofer.check_directory("./_site", options).run
end

task :default => :test 