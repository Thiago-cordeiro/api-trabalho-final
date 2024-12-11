import { error } from "console";
import prismaClient from "../prisma";

interface CreateCustomerProps{
    msg: string;
}

class CreateCustomerService{
    async execute({msg}: CreateCustomerProps){
    if(!msg){
        throw new Error("prencha todos os campos")
    }
    const customer = await prismaClient.customer.create({
        data:{
            msg
        }
    })

    return customer
    }
}
export { CreateCustomerService}