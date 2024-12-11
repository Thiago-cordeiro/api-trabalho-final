import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerController } from "./controllers/CreateCustomerController";
import { ListCustomersController } from "./controllers/ListCustomerController";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";
import { UpdateCustomerController } from "./controllers/UpdateCustomerController";

export async function routes(fastify:FastifyInstance, options: FastifyPluginOptions) {
    
    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok :true }
    })

    fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => { //create
        return new CreateCustomerController().handle(request,reply)
    })

    fastify.get("/customers", async (request: FastifyRequest, reply: FastifyReply) => { //read
        return new ListCustomersController().handle(request,reply)
    })

    fastify.delete("/customer", async (request: FastifyRequest, reply: FastifyReply) => { //delete
        return new DeleteCustomerController().handle(request,reply)
    })

    fastify.put("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateCustomerController().handle(request, reply);
    });
    
}