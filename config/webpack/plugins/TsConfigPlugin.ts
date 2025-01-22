import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";
import path from "node:path";

export const TsConfigPlugin = new TsconfigPathsPlugin({
    configFile: path.resolve('tsconfig.json'),
})