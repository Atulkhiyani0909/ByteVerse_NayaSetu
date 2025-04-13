import Ticket from '../models/tickets.model.js'; 


export const createTicket = async (req, res) => {
    try {
        
        const id = req.params.id;
        
        const ticketData = {
            ...req.body,
            owner: id, 
            
// TODO : when user logged in then the user._id and username is autoprovided by this 

            // owner: req.user._id, 
            // Name: req.user.name, 
        };

        const ticket = new Ticket(ticketData);
        await ticket.save();
        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ message: 'Error creating ticket', error });
    }
};

export const getUserTickets = async (req, res) => {
    try {
        const id = req.params.id;

        const tickets = await Ticket.find({ owner: id });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets', error });
    }
};
