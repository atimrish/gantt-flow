import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export const HtmlPlugin = (isProd: boolean) => new HtmlWebpackPlugin({
    template: path.resolve('src', 'index.html'),
    minify: isProd
})