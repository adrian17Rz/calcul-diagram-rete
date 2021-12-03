import { esbuildPlugin } from "@web/dev-server-esbuild";
import rollupPostcss from 'rollup-plugin-postcss';
import { fromRollup } from '@web/dev-server-rollup';

const postcss = fromRollup(rollupPostcss);

export default {
  nodeResolve: true,
  mimeTypes: {
    '**/*.css': 'js',
  },
  plugins: [
    esbuildPlugin({ ts: true, target: 'auto' }),
    esbuildPlugin({ tsx: true, jsxFactory: "React.createElement", jsxFragment: "Fragment" }),
    postcss({ include: ['src/**/*.css'], modules: true }),
  ],
};
