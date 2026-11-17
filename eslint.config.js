import js from '@eslint/js';
import skipFormattingConfig from '@vue/eslint-config-prettier/skip-formatting';
import { withVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';

export default withVueTs(
  {
    ignores: ['dist/**', 'dist-ssr/**', 'coverage/**']
  },
  js.configs.recommended,
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormattingConfig
);
