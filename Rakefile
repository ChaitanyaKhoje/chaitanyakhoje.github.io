require 'html-proofer'

task :test do
  sh "bundle exec jekyll build"
  options = { 
    :assume_extension => true,
    :check_html => true,
    :check_img_http => false,  # Disable image HTTP checks initially
    :check_opengraph => false, # Disable OpenGraph checks
    :check_favicon => false,   # Disable favicon checks
    :enforce_https => false,   # Don't enforce HTTPS
    :disable_external => true, # Temporarily disable external link checks
    :allow_missing_href => true, # Allow missing hrefs temporarily
    :allow_hash_href => true,  # Allow hash hrefs
    :report_invalid_tags => false,
    :report_missing_names => false,
    :report_script_embeds => false,
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