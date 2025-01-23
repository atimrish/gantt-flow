import type {StorybookConfig} from "@storybook/react-webpack5";
import {StyleRule} from "../config/webpack/rules/StyleRule";
import {CssPlugin} from "../config/webpack/plugins/CssPlugin";
import {TsConfigPlugin} from "../config/webpack/plugins/TsConfigPlugin";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-webpack5-compiler-swc",
        "@storybook/addon-onboarding",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
    ],
    staticDirs: ['../src/shared/ui/assets/**/*'],
    framework: {
        name: "@storybook/react-webpack5",
        options: {
            builder: {
                useSWC: true
            }
        },
    },
    swc: () => ({
        jsc: {
            transform: {
                react: {
                    runtime: 'automatic'
                }
            }
        }
    }),
    webpackFinal: async (config) => {
        if (config.plugins) {
            config.plugins = [...config.plugins, CssPlugin]
        }

        if (config.resolve) {
            config.resolve.plugins = [...(config.resolve.plugins || []), TsConfigPlugin]
        }

        if (config.module?.rules) {
            // замена конфликтного дефолтного css лоадера
            // @ts-ignore
            const filtered = config.module.rules.filter(i => !i?.test?.test('i.css'))
            config.module.rules = [...filtered, StyleRule]
        }

        return config
    }
};
export default config;
