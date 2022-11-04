export type CreateCompany = {
    name: string;
    user: AdminUser
}

type AdminUser = {
    name: string;
    email: string;
    password: string;
    companyRoleId: string;
}