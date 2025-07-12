import { setupBankProducts, setupBankUsers } from "./setupProductsUsers.js";

// Chama todos os setups
export const setupAllTables = async () => {
    await setupBankProducts()
    await setupBankUsers()
}
