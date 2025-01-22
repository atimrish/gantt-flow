import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const StyleRule = {
    test: /\.css$/,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                modules: true
            }
        },
    ],
}