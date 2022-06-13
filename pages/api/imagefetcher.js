// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
    const url = decodeURIComponent(req.query.url);
    const result = await fetch(url);
    const body = await result.body;
    body.pipe(res);
  };