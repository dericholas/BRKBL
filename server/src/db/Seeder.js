/* eslint-disable no-console */
import { connection } from "../boot.js";
import PostSeeder from "./seeders/PostSeeder.js";
import UserSeeder from "./seeders/UserSeeder.js";
import FollowsGenerator from "./seeders/FollowsGenerator.js";

class Seeder {
  static async seed() {
    console.log("seeding users...")
    await UserSeeder.seed()
    console.log("seeding posts...")
    await PostSeeder.seed()
    console.log("generating follows...")
    await FollowsGenerator.generate()

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
