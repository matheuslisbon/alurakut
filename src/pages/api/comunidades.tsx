import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(request, response) {
  if (request.method === "POST") {
    const TOKEN = "7d8c35bbcc9cf15e61f59c1145f14e";
    console.log(request.body.data);
    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({
      itemType: "975760",
      ...request.body,
    });

    response.json({
      registroCriado: registroCriado,
    });
    return;
  }
}
