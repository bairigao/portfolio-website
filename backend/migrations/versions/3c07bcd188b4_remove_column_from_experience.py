"""remove column from experience

Revision ID: 3c07bcd188b4
Revises: faae9bb86696
Create Date: 2025-02-19 15:05:01.354740

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3c07bcd188b4'
down_revision = 'faae9bb86696'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('experience', schema=None) as batch_op:
        batch_op.drop_column('description')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('experience', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.TEXT(), nullable=False))

    # ### end Alembic commands ###
