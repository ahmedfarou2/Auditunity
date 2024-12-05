import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// User Model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  nameAr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nameEn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  titleAr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  titleEn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('SYSTEM_ADMIN', 'USER'),
    defaultValue: 'USER'
  },
  profileCompletion: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

// Organization Model
const Organization = sequelize.define('Organization', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  type: {
    type: DataTypes.ENUM('FIRM', 'COMPANY'),
    allowNull: false
  },
  nameAr: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nameEn: {
    type: DataTypes.STRING,
    allowNull: false
  },
  registrationNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
    defaultValue: 'PENDING'
  },
  verificationStatus: {
    type: DataTypes.ENUM('PENDING', 'VERIFIED', 'REJECTED'),
    defaultValue: 'PENDING'
  }
});

// OrganizationMember Model
const OrganizationMember = sequelize.define('OrganizationMember', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'MEMBER'),
    defaultValue: 'MEMBER'
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
    defaultValue: 'PENDING'
  },
  permissions: {
    type: DataTypes.JSON,
    defaultValue: []
  }
});

// Relationships
User.hasMany(OrganizationMember);
OrganizationMember.belongsTo(User);

Organization.hasMany(OrganizationMember);
OrganizationMember.belongsTo(Organization);

Organization.belongsTo(User, { as: 'admin' });

export { User, Organization, OrganizationMember };