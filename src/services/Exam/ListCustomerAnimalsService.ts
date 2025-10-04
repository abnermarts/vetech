import prismaClient from "../../prisma";

interface Customer{
    idCustomerFather: string,
}

class ListCustomerAnimalsService {
    async execute(idCustomerFather: Customer[]){
        const ids = idCustomerFather.map(customer => customer.idCustomerFather)

        const createExame = await prismaClient.filho.findMany({
            where: {
                idCustomerFather: { in: ids},
            },
            select:{
                id: true,
                idCustomerFather: true,
                id_especie_animal: true,
                nm_especie_animal: true,
                id_unidade_exploracao: true,
                animals: true,
            }
        })

        return createExame;

    }
}

export { ListCustomerAnimalsService }