const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
  }
  
  module.exports = {
    ROLE: ROLE,
    users: [
      { id: 1, name: 'user1', role: ROLE.ADMIN },
      { id: 2, name: 'user2', role: ROLE.BASIC },
      { id: 3, name: 'user3', role: ROLE.BASIC }
    ],
    events: [
      { id: 1, name: "user1's Project", userId: 1 },
      { id: 2, name: "user2's Project", userId: 2 },
      { id: 3, name: "user3's Project", userId: 3 }
    ]
  }