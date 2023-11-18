import dotenv from "dotenv";


export const envConfig = () => {
    if (process.env.NODE_ENV !== 'production') {
        dotenv.config({ path: "./env/acc.env" });
    } else {
        dotenv.config({ path: "./env/local.env" });
    }
}

