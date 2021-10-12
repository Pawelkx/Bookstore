// Required for tailwind to purge css.
const nodeEnv = process.argv.includes(`--prod`) ? `production` : `development`;
process.env.NODE_ENV = nodeEnv;

module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/u,
                loader: `postcss-loader`,
                options: {
                    postcssOptions: {
                        ident: `postcss`,
                        syntax: `postcss-scss`,
                        plugins: [
                            require(`postcss-import`),
                            require(`tailwindcss`),
                            require(`autoprefixer`),
                        ],
                    },
                },
            },
        ],
    },
};
