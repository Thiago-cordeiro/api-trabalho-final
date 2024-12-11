import prismaClient from "../prisma";

interface UpdateCustomerProps {
    id: string;
    msg: string;
}

class UpdateCustomerService {
    async execute({ id, msg }: UpdateCustomerProps) {
        if (!id) {
            throw new Error("Erro: ID não fornecido.");
        }

        if (!msg) {
            throw new Error("Erro: Mensagem (msg) não fornecida.");
        }

        const findCustomer = await prismaClient.customer.findFirst({
            where: { id }
        });

        if (!findCustomer) {
            throw new Error("Erro: Cliente não encontrado.");
        }

        const updatedCustomer = await prismaClient.customer.update({
            where: { id },
            data: { msg }
        });

        return updatedCustomer;
    }
}

export { UpdateCustomerService };
