/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./controllers/CriptoBOTController.js
 *
 * http://localhost:3000/criptoBOT
 */

// https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md
// https://br.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/?library=cloud-widget&feature=technical-analysis-charts
// https://testnet.binance.vision/

import axios from 'axios';
import crypto from 'crypto';
import { Request, Response } from 'express';
import querystring from 'querystring';

class CriptoBOTController {
    static postBinance(req: Request, res: Response) {
        const { side, symbol, quantity } = req.params;

        const data = {
            symbol,
            side,
            quantity,
            type: 'MARKET',
            timestamp: Date.now(),
            recvWindow: 60000,
        };

        const signature = crypto
            .createHmac('sha256', process.env.BINANCE_API_SECRET)
            .update(querystring.stringify(data))
            .digest('hex');

        const newData = {
            ...data,
            signature,
        };
        const url = `https://testnet.binance.vision/api/v3/order?${querystring.stringify(
            newData
        )}`;

        axios
            .post(url, null, {
                headers: {
                    'X-MBX-APIKEY': process.env.BINANCE_API_KEY,
                },
            })
            .then((result) => {
                console.log(result.data);
                res.json(result.data);
            })
            .catch((err) => {
                console.error(err.response.data);
                res.sendStatus(500);
            });
    }
}

module.exports = CriptoBOTController;