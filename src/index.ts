import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

const steamDeckModels = {
  lcd_64: "903905",
  lcd_256: "903906",
  lcd_512: "903907",
  oled_512: "1202542",
  oled_1tb: "1202547",
} as const;

type SteamDeckModel = keyof typeof steamDeckModels;

app.get("/api/stock/:model", async (c) => {
  const model = c.req.param("model") as SteamDeckModel;
  const packageid = steamDeckModels[model];

  if (!packageid) {
    return c.json(
      {
        error: "Invalid model specified.",
        available_models: Object.keys(steamDeckModels),
      },
      400
    );
  }

  const country = c.req.query("country") || "US";

  const url = `https://api.steampowered.com/IPhysicalGoodsService/CheckInventoryAvailableByPackage/v1?origin=https:%2F%2Fstore.steampowered.com&country_code=${country}&packageid=${packageid}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Steam API request failed with status ${response.status}`
      );
    }
    const data = await response.json();

    const { inventory_available, high_pending_orders } = data.response;

    return c.json({
      inventory_available,
      high_pending_orders,
    });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch stock data from Steam API" }, 502);
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
