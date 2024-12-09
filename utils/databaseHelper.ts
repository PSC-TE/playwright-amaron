import { createConnection, Connection } from 'mysql2/promise';

class DatabaseHelper {
    private connection: Connection; // Use Client for PostgreSQL

    constructor(private config: { host: string; user: string; password: string; database: string }) {}

    // Function to connect to the database
    async connect() {
        this.connection = await createConnection(this.config);
        await this.connection.connect();
    }

    // Function to retrieve phone number
    async getPhoneNumber(customerId: number): Promise<string> {
        const [rows] = await this.connection.execute('SELECT phone_number FROM customers WHERE id = ?', [customerId]);
        return rows[0]?.phone_number || '';
    }

    // Function to retrieve OTP
    async getOTP(customerId: number): Promise<string> {
        const [rows] = await this.connection.execute('SELECT otp FROM otp_table WHERE customer_id = ?', [customerId]);
        return rows[0]?.otp || '';
    }

    // Function to retrieve customer name
    async getCustomerName(customerId: number): Promise<string> {
        const [rows] = await this.connection.execute('SELECT name FROM customers WHERE id = ?', [customerId]);
        return rows[0]?.name || '';
    }

    // Function to close the database connection
    async close() {
        await this.connection.end();
    }
}
