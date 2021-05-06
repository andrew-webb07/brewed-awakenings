import { getEmployees, getOrders} from "./database.js"

const employees = getEmployees()
const orders = getOrders()

// document refers to the entire web page or the DOM - "Document Object Model"
// addEventListener is a method that primes the document reference for a browser-related event within the document (type, (parameter for the function)); (clickEvent) is a function with the rest of the code before it
document.addEventListener("click", (clickEvent) => {
    // itemClicked stores value of where on the document the mouse click happened
        const itemClicked = clickEvent.target
        // This refers to id that is set in our list item in HTML id="employee--"
        // checking if the id attribute of the html element clicked starts with the string of "employee", and will evaluate to true or false
        if (itemClicked.id.startsWith("employee")) {
            //split produces array that looks like ["employee", "id"] so [, ...] refers to "id" as employeeId; this comes from the html list item created below with id="employee--${employee.id}"
            const [,employeeId] = itemClicked.id.split("--")

            // Cycling through our employees array one element at a time using employee to store that item
            for (const employee of employees) {
                // checking if current object id is equal to the integer(checked by parseInt method) of employeeId clicked which refers to the list item clicked in the html, e.i. <li id="employee--${employee.id}"
                if (employee.id === parseInt(employeeId)) {
                    // declared variable employeeOrders to store the newly generated, filtered array from the orders array
                    const employeeOrders = orders.filter(
                        // if parameter of individual order's employeeId of the orders array equals the id of the current employee being cycled through from the loop above, that array item gets added to the new filtered array employeeOrders
                        (order) => {
                            if (order.employeeId === employee.id) {
                                return true
                            }
                        }
                    )
                    // 
                    window.alert(`${employee.name} sold ${employeeOrders.length} products`)
                }
            }
        }
    }
)

export const Employees = () => {
    let html = "<ul>"

    for (const employee of employees) {
        html += `<li id="employee--${employee.id}">${employee.name}</li>`
    }

    html += "</ul>"

    return html
}

