{ pkgs }: with pkgs; {
    deps = [
        yarn
        nodejs-16_x
        nodePackages.typescript
        nodePackages.typescript-language-server
    ];
}