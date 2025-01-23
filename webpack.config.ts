import webpack from 'webpack';
import path from "node:path";
import {Configuration} from 'webpack-dev-server'
import {StyleRule} from "./config/webpack/rules/StyleRule";
import {TypescriptRule} from "./config/webpack/rules/TypescriptRule";
import {HtmlPlugin} from "./config/webpack/plugins/HtmlPlugin";
import {CssPlugin} from "./config/webpack/plugins/CssPlugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {FontRule} from "./config/webpack/rules/FontRule";
import {ImageRule} from "./config/webpack/rules/ImageRule";

interface WebpackEnvironment {
    mode: webpack.Configuration['mode'],
    port: number
}

export default (env: Partial<WebpackEnvironment>): webpack.Configuration => {
    const isProd = env.mode === 'production';

    return  {
        mode: env.mode || 'development',
        devtool: 'inline-source-map',
        entry: path.resolve('src', 'index.tsx'),
        output: {
            path: path.resolve('dist'),
            filename: 'bundle-[contenthash:8].js',
            clean: true
        },
        plugins: [
            HtmlPlugin(isProd),
            CssPlugin,
        ],
        module: {
            rules: [
                StyleRule,
                TypescriptRule,
                FontRule,
                ImageRule
            ],
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                '@src': path.resolve('src'),
            }
        },
        optimization: {
            minimizer: [new MiniCssExtractPlugin()],
        },
        devServer: {
            port: env.port || 8000,
            open: true
        }
    }
}