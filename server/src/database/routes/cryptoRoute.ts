import express from "express";
import CoinGecko from "coingecko-api";
import Crypto from "./../models/cryptoModel";

const router = express.Router();
const cgClient = new CoinGecko();
const reqParams = {
  localization: true,
  tickers: false,
  market_data: true,
  community_data: false,
  developer_data: false,
  sparkline: false
};

interface MarketData
{
  high:number;
  low:number;
  open:number;
  current:number;
  lastUpdated:string;
}

interface CryptoDataResponse
{
  description:string;
  imageUrl:string;
  marketRank:number;
  creationDate:string;
  marketData:MarketData;
}

router.get("/", async (req, res) =>
{

});

router.get("/:cmid", async (req, res) =>
{
  const response = await cgClient.coins.fetch(req.params.cmid, reqParams);
  const marketData = response.data?.market_data;
  const currency = req.params.cur || req.params.currency || "eur";

  if (!response.success) {
    res.status(response.code).send({message: response.message});
    return;
  }
  const output:CryptoDataResponse = {
    description: response.data.description.en,
    imageUrl: response.data.image.thumb,
    marketRank: response.data.market_cap_rank,
    creationDate: response.data.genesis_date,
    marketData: {
      current: marketData.current_price[currency],
      high: marketData.high_24h[currency],
      low: marketData.low_24h[currency],
      open: marketData.current_price[currency] + marketData.price_change_24h_in_currency[currency],
      lastUpdated: marketData.last_updated
    }
  };
  
  res.send(output);
});

router.get("/:cmid/history/:period", async (req, res) =>
{
  req;res;
});

router.post("/", async (req, res) =>
{
  const crypto = new Crypto({
    code: req.params.code,
    name: req.params.name
  });
  let newCrypto;

  try {
    newCrypto = await crypto.save();
    return (res.send({
      status: "ok",
      data: {
        _id: newCrypto.id,
        code: newCrypto.code,
        name: newCrypto.name
      }
    }));
  }
  catch(err) {
    return (res.status(401).send({status: "error", message: "Invalid name or code."}));
  }
});

router.delete("/", async (req, res) =>
{
  req; res;
});

export default router;