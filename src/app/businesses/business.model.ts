import { OfficeModel } from "../auth/office.model"

export class BusinessModel {
    _id: string = ''
    ruc: string = ''
    certificateId: string = ''
    businessName: string = ''
    formatContact: string = ''
    mobileNumber: string = ''
    disabledAt: string | null = null
    charge: number = 0
    paymentAt: string = ''
    groupId: string = ''
    paymentGroup: string = ''
    observations: string = ''
    isMarked: boolean = false
    markedAt: Date | null = null
    offices: OfficeModel[] = []
    countProducts: number = 0
    createdAt: string = ''
    workerId: string = ''
    deletedAt: string | null = null
    isActive: boolean = true
    monthlyIncome: number = 0
    businessType: string = ''
    certificate: any
}