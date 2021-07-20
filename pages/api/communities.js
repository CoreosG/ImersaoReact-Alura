import {SiteClient} from 'datocms-client';

export default async function getRequests(request, response) {

    if(request.method === "POST"){
        const TOKEN = "e94665c59c4236e91e654a94a8628b";
        const client = new SiteClient(TOKEN);
    
        // Validar os dados antes de cadastrar
        const registroCriado = await client.items.create({
            itemType: '980467', //ID criado pelo DATO
            ...request.body
        })
    
        response.json({
            registroCriado: registroCriado,
        })
        return ;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    });
    
}