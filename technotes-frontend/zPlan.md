src
    components
        public---for all visitors
            link to login
        dashboard

    features
        auth
            login
            welcome
        notes
            notesList
        users
            usersList
    img
        bg-image

The whole app should be wraped in a layout
    public - index
    login - /login
    Another Layout - /dashboard
        welcome - index
        notes - /dashboard/notes
        users - /dashboard/users


Redux:
install @reduxjs/toolkit, react-redux.

app
    api
        apiSlice.js
    store.js
    