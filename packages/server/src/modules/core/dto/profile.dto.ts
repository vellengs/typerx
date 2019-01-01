

export class EditProfileDto {
  id: string;
  profile?: string;
  name?: string;
  email?: string;
  mobile?: string;
  company?: string;
  siteUrl?: string;
  address?: string;
}

export const ProfileResponseFields = [
  'id',
  'username',
  'name',
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
