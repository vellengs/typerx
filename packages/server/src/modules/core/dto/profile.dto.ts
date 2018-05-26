 

export class EditProfileDto {
  id: string;
  nick?: string;
  email?: string; 
  mobile?: string;
  company?: string;
  siteUrl?: string;
  address?: string;
 }
 
export const ProfileResponseFields = [
  'id',
  'username',
  'nick',
  'avatar',
  'type',
  'email',
  'groups',
  'roles',
  'mobile',
  'isDisable',
  'isAdmin',
  'isApproved',
  'expired'
];