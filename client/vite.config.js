import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: "./",
    plugins: [react()],
    server: {
      proxy: {
        "/api": process.env.VITE_APP_BACKEND_URL,
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.split("node_modules/")[1].split("/")[0];
            }
          },
        },
      },
    },
  });
};
//  base: "./",
//   build: {
//     chunkSizeWarningLimit: 1500, // Adjust chunk size limit
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             return id.toString().split('node_modules/')[1].split('/')[0].toString();
//           }
//         }
//       }
//     }
//   },
//   server: {
//     // proxy: {
//     //   "/api/": "http://localhost:8800",
//     // },
//     proxy: {
//       "/api/": import.meta.env.VITE_APP_BACKEND_URL,
//     },
    
//   },
//   plugins: [react()],