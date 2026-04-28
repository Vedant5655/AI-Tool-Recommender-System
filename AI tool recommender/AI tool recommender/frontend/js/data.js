// PRD 13.2 JS Architecture: data.js
import { store } from './store.js';

export async function fetchTools() {
  try {
    const response = await fetch('public/tools.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    store.tools = data;
    console.log(`Loaded ${store.tools.length} tools from dataset.`);
    return data;
  } catch (error) {
    console.error("Could not fetch tools.json:", error);
    // Return empty array to prevent complete crash
    return [];
  }
}
