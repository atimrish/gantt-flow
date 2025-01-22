import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const CssPlugin = new MiniCssExtractPlugin({
    filename: 'style-[contenthash:8].css',
})