const EventModel = require('./event.model');

class EventService {
    static async deleteEvent(id) {
      const event = await EventModel.destroy({where: {id}});
      if (!Event) {
        throw new NotFoundError(`Event doesn't exist.`);
      }
    }

    static async getEvents (offset, limit) {
        const options = {
          offset: +offset || 0,
          limit: +limit || 30,
          attributes: {
            exclude: ['updatedAt', 'password', 'createdAt', 'deletedAt']
          }
        };
    
        return await EventModel.findAll(options);
    } 

    static async updateEvent(id, data) {
        const event = await EventService.checkIfEventExist(id);
    
        await Event.update(data);
    
        return {id: event.id, name: event.name};
      }

      static async checkIfEventExist(eventId) {
        const options = {
          attributes: {
            exclude: ['updatedAt', 'password', 'createdAt', 'deletedAt']
          }
        };
    
        const event = await EventModel.findById(eventId, options);
        if (!event) {
          throw new NotFoundError(`Event doesn't exist.`);
        }
    
        return event;
      }
}

module.exports = EventService;