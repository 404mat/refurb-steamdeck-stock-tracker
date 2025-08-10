import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

app.get("/api/stock/:packageid", async (c) => {
  const packageid = c.req.param("packageid");
  const country = c.req.query("country") || "US";

  const url = `https://api.steampowered.com/IPhysicalGoodsService/CheckInventoryAvailableByPackage/v1?origin=https:%2F%2Fstore.steampowered.com&country_code=${country}&packageid=${packageid}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const { inventory_available, high_pending_orders } = data.response;

    return c.json({
      inventory_available,
      high_pending_orders,
    });
  } catch (error) {
    return c.json({ error: "Failed to fetch stock data" }, 500);
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
