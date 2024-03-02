import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
    @ApiProperty()
    Username: string
    @ApiProperty()
    Password: string
    @ApiProperty()
    Email: string
    @ApiProperty()
    NamaLengkap: string
    @ApiProperty()
    Alamat: string
}

export class SignInDto {
    @ApiProperty()
    Email: string
    @ApiProperty()
    Password: string
}