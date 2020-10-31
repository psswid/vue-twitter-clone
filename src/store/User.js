export const UserModule = {
    namespaced: true,

    state: {
        user: null
    },

    /**
     * Functions effecting the State
     */
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        }
    },

    /**
     * App Functions library
     */
    actions: {
        setUser({ commit }, user) {
            commit('SET_USER', user);
        }
    },
}