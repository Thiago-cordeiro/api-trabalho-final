import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateCustomerService } from "../services/UpdateCustomerService";

class UpdateCustomerController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };
        const { msg } = request.body as { msg: string };

        const customerService = new UpdateCustomerService();
        const updatedCustomer = await customerService.execute({ id, msg });

        reply.send(updatedCustomer);
    }
}


export { UpdateCustomerController };

