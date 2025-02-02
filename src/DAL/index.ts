import { Customer, ICustomer } from '../schema';

export const getCustomerById = async (id: string) : Promise<ICustomer> => {
    try {
        const customerToFind = await Customer.findById<ICustomer>(id);
        return customerToFind;
    } catch (error) {
        console.error(`Cannot find customer by id ${id}: ${error.message}`)
    }
}

export const getCustomerByName = async (firstName: string, lastName: string): Promise<Array<ICustomer>> => {
    try {
        const customersToFind = await Customer.find<ICustomer>({ $and: [{ firstName }, { lastName }] });
        return customersToFind;
    } catch (error) {
        console.error(`Cannot find customer by name ${firstName} ${lastName}: ${error.message}`)
    }
}

export const deleteCustomer = async (id: string) => {
    try {
        const deletionResult = await Customer.findByIdAndDelete(id);
        return deletionResult;
    } catch (error) {
        console.error(`Cannot delete customer by id ${id}: ${error.message}`)
    }
}

export const createCustomer = async (customer: ICustomer) => {
    const customerToAdd = new Customer(customer);

    try {
        const insertResult = await customerToAdd.save();
        return insertResult;
    } catch (error) {
        console.error(`Cannot save ${customerToAdd.firstName} ${customerToAdd.lastName}: ${error.message}`)
    }
}

export const updateCustomer = async (customer: ICustomer) => {
    try {
        await Customer.findByIdAndUpdate(customer._id, customer);
    } catch (error) {
        console.error(`Cannot update ${customer.firstName} ${customer.lastName}: ${error.message}`)
    }
}