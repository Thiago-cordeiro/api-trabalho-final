import {FastifyRequest, FastifyReply} from "fastify";
import { CreateCustomerService } from '../services/CreateCustomerService'

class CreateCustomerController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { msg } = request.body as {msg: string};
        console.log(msg)

        const customerService = new CreateCustomerService()
        
        const customer = await customerService.execute({msg});

        reply.send(customer)
    }
}
export { CreateCustomerController }