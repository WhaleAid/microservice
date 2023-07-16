import { firstValueFrom } from 'rxjs';
import { AuthResponse, AuthServiceClient, User } from 'src/stubs/auth/auth';

export async function authUser(auth?: string, grpcService?: AuthServiceClient) {
    if (!auth) {
        throw new Error({ error: 'unauthorized' }.error);
    }
    const token = auth.substring(7, auth.length);
    const response = await firstValueFrom<AuthResponse| { error: string }>(grpcService?.validateUser({ token: token }));
    if (Object.prototype.hasOwnProperty.call(response, 'error')) {
        throw new Error((response as { error: string }).error);
    }
    return (response as { user: User }).user;
}
