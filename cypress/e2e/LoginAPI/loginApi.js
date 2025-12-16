import { URL, USER } from "../utils/envVariaveis";

export function loginAPI(){ //=> loga na API para resgatar o token e injeta no localStorage
    cy.request({
            method: "POST",
            url: `${URL.API_BASE}login`,
            headers: { Platform : "teste" },
            body: {
                email: USER.EMAIL,
                password: USER.PASSWORD
            }
        }).then((resp) => {
            const jwtToken = resp.body.jwtToken
            cy.visit(URL.LAB, {
                onBeforeLoad(win){
                    win.localStorage.setItem('jwtToken', jwtToken)
                }
            })
        })
}