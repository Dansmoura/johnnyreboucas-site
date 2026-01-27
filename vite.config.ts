import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  build: {
    target: 'esnext',
    outDir: 'dist',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'vaul@1.1.2': 'vaul',
      'sonner@2.0.3': 'sonner',
      'recharts@2.15.2': 'recharts',
      'react-resizable-panels@2.1.7': 'react-resizable-panels',
      'react-hook-form@7.55.0': 'react-hook-form',
      'react-day-picker@8.10.1': 'react-day-picker',
      'next-themes@0.4.6': 'next-themes',
      'lucide-react@0.487.0': 'lucide-react',
      'input-otp@1.4.2': 'input-otp',

      'figma:asset/ef852d0a546660aa697c387bbb2f38062be8dcda.png': path.resolve(__dirname, './src/assets/ef852d0a546660aa697c387bbb2f38062be8dcda.png'),
      'figma:asset/e73f472387a95ae6312f3903f8407b33ee5b1b67.png': path.resolve(__dirname, './src/assets/e73f472387a95ae6312f3903f8407b33ee5b1b67.png'),
      'figma:asset/da7dfd3f088ee83b811e41eb4a4a325fa6fd6233.png': path.resolve(__dirname, './src/assets/da7dfd3f088ee83b811e41eb4a4a325fa6fd6233.png'),
      'figma:asset/cd6f702f297ed2f6e51d2e9dcdb41006ed738c0f.png': path.resolve(__dirname, './src/assets/cd6f702f297ed2f6e51d2e9dcdb41006ed738c0f.png'),
      'figma:asset/b881a7247ba2594c9ec6cc24a7a70078d3bbe6fd.png': path.resolve(__dirname, './src/assets/b881a7247ba2594c9ec6cc24a7a70078d3bbe6fd.png'),
      'figma:asset/6838e40d50507a6bb6cbfe88c223655d35e5f388.png': path.resolve(__dirname, './src/assets/6838e40d50507a6bb6cbfe88c223655d35e5f388.png'),
      'figma:asset/47803e83f7fe1513c9a7db532fe8e8c81fad5914.png': path.resolve(__dirname, './src/assets/47803e83f7fe1513c9a7db532fe8e8c81fad5914.png'),
      'figma:asset/23a7e8d0ab30f510bc1f7b77298050084e77bc35.png': path.resolve(__dirname, './src/assets/23a7e8d0ab30f510bc1f7b77298050084e77bc35.png'),

      'embla-carousel-react@8.6.0': 'embla-carousel-react',
      'cmdk@1.1.1': 'cmdk',
      'class-variance-authority@0.7.1': 'class-variance-authority',

      '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
      '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
      '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
      '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
      '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
      '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
      '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
      '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
      '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
      '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
      '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
      '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
      '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
      '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
      '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
      '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
      '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
      '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
      '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
      '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
      '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
      '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
      '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',

      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 3000,
    open: true,
  },
})
