import { ensureBuckets } from "@dgrandeur/storage";

async function main(): Promise<void> {
  await ensureBuckets();
}

void main();
