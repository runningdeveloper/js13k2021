export default {
    mount: {
        // get everything from src to build/
        src: '/',
      },

    //   buildOptions: {
    //     minify: false,
    //     bundle: true,
    //   },
      optimize: {
        bundle: true,
        minify: true,
        target: 'es2019',
        treeshake: true,
        sourcemap: false,
        manifest: false
      },
      plugins: [
        [
            'snowpack-plugin-minify-html',
            {
              htmlMinifierOptions: {
                collapseWhitespace: true,
                sortAttributes: true,
                removeComments: true,
              },
            },
          ],
        // [
        //   'snowpack-plugin-terser',
        //   {
        //     terserOptions: {
        //       compress: {
        //         arguments: true,
        //         passes: 4,
        //         unsafe_arrows: true,
        //         module: true,
        //       },
        //       format:{
        //         comments: false,
        //       }
        //     },
        //   },
        // ],
      ],
  };