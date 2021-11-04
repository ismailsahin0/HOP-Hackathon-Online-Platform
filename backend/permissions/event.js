
const { ROLE } = require('../db/data')

const Event = () => {
  const { isLoading, error } = useAuth();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="event" className="">
        <NavBar />
        <Container className="">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/external-api" component={ExternalApi} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

function canViewEvent(user, event) {
  return (
    user.role === ROLE.ADMIN ||
    event.userId === user.id
  )
}

function scopedEvents(user, events) {
  if (user.role === ROLE.ADMIN) return events
  return events.filter(event => event.userId === user.id)
}

function canDeleteEvent(user, event) {
  return event.userId === user.id
}

module.exports = {
  canViewEvent,
  scopedEvents,
  canDeleteEvent
}

export default Event;