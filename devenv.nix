{ pkgs, ... }:

{
  env.GREET = "rafalp.com";

  packages = [ pkgs.git ];

  languages.javascript.enable = true;
  languages.typescript.enable = true;

  enterShell = ''
    git --version
    echo "Node $(node --version)"
    echo "NPM $(npm --version)"
  '';

  pre-commit.hooks = {
    actionlint.enable = true;
    typos.enable = true;
  };
}
