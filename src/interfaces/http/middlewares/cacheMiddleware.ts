import * as cache from 'memory-cache';

export const cacheMiddleware = (req: any,res: any,next: any) => {
    let key = `${req.method}:${req.originalUrl}`;
    //console.log(key);

    let body = cache.get(key);
    // console.log(body);

    if (body) {
        return res.json(body);
    } else {
        res.jsonFunc = res.json;
        res.json = (body: any) => {
            cache.put(key, body, 10800000); // 3 hours
            res.jsonFunc(body);
        }
        next();
    }
}